package com.spotifyapi.musicspot.services;

import com.spotifyapi.musicspot.config.SpotifyConfiguration;
import lombok.Getter;
import org.apache.hc.core5.http.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.credentials.ClientCredentials;
import se.michaelthelin.spotify.requests.authorization.client_credentials.ClientCredentialsRequest;

import java.io.IOException;
import java.time.Instant;

@Service
public class SpotifyAuthService {

    private static final Logger logger = LoggerFactory.getLogger(SpotifyAuthService.class);
    @Getter
    private final SpotifyApi spotifyApi;
    private final ClientCredentialsRequest clientCredentialsRequest;

    private String accessToken;
    private Instant tokenExpiresAt;

    public SpotifyAuthService() {
        this.spotifyApi = new SpotifyConfiguration().getSpotifyObject();
        this.clientCredentialsRequest = spotifyApi.clientCredentials().build();
    }

    public void ensureAccessToken() {
        if (accessToken == null || Instant.now().isAfter(tokenExpiresAt)) {
            authenticate();
        }
    }

    private void authenticate() {
        try {
            final ClientCredentials clientCredentials = clientCredentialsRequest.execute();
            this.accessToken = clientCredentials.getAccessToken();
            this.tokenExpiresAt = Instant.now().plusSeconds(clientCredentials.getExpiresIn());
            spotifyApi.setAccessToken(accessToken);
            logger.info("New token acquired: {}", accessToken);
        } catch (IOException | SpotifyWebApiException | ParseException e) {
            logger.error("Error authenticating: {}", e.getMessage());
            throw new RuntimeException("Failed to authenticate with Spotify API", e);
        }
    }
}