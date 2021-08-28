class BaseResponse {
  constructor({errno, data, message}) {
    this.errno = errno
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
      errno: 0,
      data
    })
  }
};

class ErrorResponse extends BaseResponse {
  constructor({errno, message}) {
    super({
      errno,
      message
    })
  }
};

module.exports = {
  SuccessResponse,
  ErrorResponse
};