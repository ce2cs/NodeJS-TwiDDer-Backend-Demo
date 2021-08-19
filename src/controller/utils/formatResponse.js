class BaseResponse {
  constructor({errorNo, data, message}) {
    this.errorNo = errorNo
    if (data) {
      this.data = data
    }
    if (message) {
      this.message = message
    }
  }
};

class SuccessResponse extends BaseResponse {
  constructor(data = {}) {
    super({
      errorNo: 0,
      data
    })
  }
};

class ErrorResponse extends BaseResponse {
  constructor({errorNo, message}) {
    super({
      errorNo,
      message
    })
  }
};

module.exports = {
  SuccessResponse,
  ErrorResponse
};