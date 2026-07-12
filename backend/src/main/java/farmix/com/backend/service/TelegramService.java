package farmix.com.backend.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestClientResponseException;

import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class TelegramService {

    private final RestClient restClient;

    @Value("${telegram.bot.enabled:false}")
    private boolean enabled;

    @Value("${telegram.bot.token:}")
    private String token;

    @Value("${telegram.bot.chat-id:}")
    private String chatId;

    public void sendMessage(String message) {
        if (!enabled){
            return;
        }

        if (!StringUtils.hasText(token)
                || !StringUtils.hasText(chatId)){
            log.warn(
                    "Telegram notification is enabled, " +
                            "but token or chat ID is missing"
            );
            return;
        }

        try{
            restClient.post()
                    .uri("/bot{token}/sendMessage", token)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of(
                            "chat_id", chatId,
                            "text", message
                    )).retrieve()
                    .toBodilessEntity();
        }catch (RestClientResponseException e){
            log.warn(
                    "Telegram request failed. Status: {}, response: {}",
                    e.getStatusCode(),
                    e.getResponseBodyAsString()
            );
        }catch (Exception e){
            log.warn(
                    "Could not send Telegram notification: {}",
                    e.getMessage()
            );
        }
    }
}
