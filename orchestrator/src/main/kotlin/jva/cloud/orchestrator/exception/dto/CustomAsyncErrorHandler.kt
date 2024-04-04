package jva.cloud.orchestrator.exception.dto

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.aop.interceptor.AsyncUncaughtExceptionHandler
import java.lang.reflect.Method

class CustomAsyncErrorHandler : AsyncUncaughtExceptionHandler {
    companion object {
        const val ERROR: String = "Error in the asynchronous call "
        const val ERROR_METHOD: String = "Error in the method "
        private val logger: Logger = LoggerFactory.getLogger(CustomAsyncErrorHandler::class.java)
    }

    override fun handleUncaughtException(ex: Throwable, method: Method, vararg params: Any?) {
        logger.error("$ERROR  ${ex.message}");
        logger.error("$ERROR_METHOD ${method.name}");
    }
}