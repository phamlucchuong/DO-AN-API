package com.example.recruitment_website.payloads;

public class EmployerLoginResponse {

    private String success;
    private String message;
    private Object data;

    public EmployerLoginResponse(String success, String message, Object data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    public String getSuccess() {
        return success;
    }

    public String getMessage() {
        return message;
    }

    public Object getData() {
        return data;
    }

    public void setSuccess(String success) {
        this.success = success;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
