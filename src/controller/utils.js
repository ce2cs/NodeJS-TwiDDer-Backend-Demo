const path = require('path');
const fse = require('fs-extra');
const {ErrorResponse, SuccessResponse} = require("./utils/formatResponse");
const {uploadFileSizeFailInfo} = require("./utils/errorCodes");

const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles');

const MIX_SIZE = 1024 * 1024 * 1024;

fse.pathExists(DIST_FOLDER_PATH).then(exist => {
    if (!exist) {
        fse.ensureDir(DIST_FOLDER_PATH);
    }
})

async function saveFile({ name, type, size, filePath }) {
    if (size > MIX_SIZE) {
        await fse.remove(filePath);
        return new ErrorResponse(uploadFileSizeFailInfo);
    }

    const fileName = Date.now() + '.' + name;
    const distFilePath = path.join(DIST_FOLDER_PATH, fileName);
    await fse.move(filePath, distFilePath);
    return new SuccessResponse({
        url: '/' + fileName
    });
}

module.exports = {
    saveFile
};
