package jva.cloud.orchestrator.service.event

import java.util.concurrent.CompletableFuture
import java.util.function.Supplier

@FunctionalInterface
interface DeadLetterQueueSendMessageService : Supplier<CompletableFuture<Boolean>> {
}