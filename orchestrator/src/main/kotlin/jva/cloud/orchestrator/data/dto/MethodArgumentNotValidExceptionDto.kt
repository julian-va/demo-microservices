package jva.cloud.orchestrator.data.dto

data class MethodArgumentNotValidExceptionDto(
    val fieldName: String,
    val errorMessage: String?
)
