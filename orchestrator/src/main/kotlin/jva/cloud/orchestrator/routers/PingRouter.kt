package jva.cloud.orchestrator.routers

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping(path = ["/ping"])

class PingRouter {
    companion object {
        const val RESPONSE: String = "response";
        const val PONG: String = "pong"
    }

    @GetMapping()
    fun ping(): ResponseEntity<Map<String, String>> {
        return ResponseEntity.ok().body(mapOf(RESPONSE to PONG))
    }
}