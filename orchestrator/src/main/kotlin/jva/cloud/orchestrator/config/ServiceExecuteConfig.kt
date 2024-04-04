package jva.cloud.orchestrator.config

import org.apache.tomcat.util.threads.VirtualThreadExecutor
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import java.util.concurrent.Executor

@Configuration
class ServiceExecuteConfig {
    companion object {
        const val EXECUTOR_SPRING: String = "Executor_virtual_thread_service_spring ";
    }

    @Bean(name = [EXECUTOR_SPRING])
    fun taskExecutor(): Executor {
        return VirtualThreadExecutor(EXECUTOR_SPRING)
    }
}