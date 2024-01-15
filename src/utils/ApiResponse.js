class ApiResponse {
  constructor(statusCode, data, message = "success") {
    (this.statusCode = statusCode), (this.data = data);
    this.message = message;
    this.success = statusCode < 400;
  }
}

export default ApiResponse;

//mainly informational response (100-199)
//successfull res (200-299)
//redirection mess(300-399);
//client error (400-499)
//server error (500-599)
