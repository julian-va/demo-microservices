package jva.cloud.orchestrator.config

import jva.cloud.orchestrator.exception.dto.CustomAsyncErrorHandler
import org.springframework.aop.interceptor.AsyncUncaughtExceptionHandler
import org.springframework.context.annotation.Configuration
import org.springframework.scheduling.annotation.AsyncConfigurer
import org.springframework.scheduling.annotation.EnableAsync

@Configuration
@EnableAsync
class CustomAsync : AsyncConfigurer {
    override fun getAsyncUncaughtExceptionHandler(): AsyncUncaughtExceptionHandler? {
        return CustomAsyncErrorHandler()
    }
}