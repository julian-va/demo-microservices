package jva.cloud.orchestrator.exception

import jva.cloud.orchestrator.data.dto.MethodArgumentNotValidExceptionDto
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.context.request.WebRequest

@ControllerAdvice
class ExceptionRouter {
    @ExceptionHandler(value = [MethodArgumentNotValidException::class])
    fun methodArgumentNotValidException(
        ex: MethodArgumentNotValidException,
        webRequest: WebRequest
    ): ResponseEntity<List<MethodArgumentNotValidExceptionDto>> {
        val response = ex.bindingResult.fieldErrors.map {
            MethodArgumentNotValidExceptionDto(
                fieldName = it.field,
                errorMessage = it.defaultMessage
            )
        }.toList()
        return ResponseEntity.badRequest().body(response)
    }
}