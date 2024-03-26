package jva.cloud.orchestrator.config

import org.apache.kafka.clients.admin.NewTopic
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.kafka.config.TopicBuilder

@Configuration
class TopicConfig(
    @Value("\${kafka.topic}") private val topic: String,
    @Value("\${kafka.topic_retry}") private val topicRetry: String
) {
    @Bean
    fun newTopicOrder(): NewTopic {
        return TopicBuilder
            .name(topic)
            .partitions(4)
            .replicas(1)
            .build();
    }

    @Bean
    fun newTopicRetry(): NewTopic {
        return TopicBuilder
            .name(topicRetry)
            .partitions(4)
            .replicas(1)
            .build();
    }
}