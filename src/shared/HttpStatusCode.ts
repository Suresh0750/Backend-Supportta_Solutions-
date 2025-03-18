export enum HttpStatus {
    Success = 200,
    Created = 201,
    Accepted = 202,
    NoContent = 204,
    Redirect = 301,
    BadRequest = 400,
    Unauthorized = 401,
    PaymentError = 402,
    Forbidden = 403,
    NotFound = 404,
    Conflict = 409,
    UnprocessableEntity = 422,
    InternalServerError = 500,
    NotImplemented = 501,
    BadGateway = 502,
    ServiceUnavailable = 503,
    RateLimitExceeded = 429
}