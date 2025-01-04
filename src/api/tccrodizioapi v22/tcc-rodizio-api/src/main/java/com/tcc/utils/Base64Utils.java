package com.tcc.utils;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Base64;

import javax.imageio.ImageIO;

public class Base64Utils {

    public static String encodeToBase64(byte[] data) {
        return Base64.getEncoder().encodeToString(data);
    }

    public static byte[] decodeFromBase64(String base64String) {
        return Base64.getDecoder().decode(base64String);
    }

    public static byte[] compressImage(byte[] imageData, float quality) throws IOException {
        ByteArrayInputStream bais = new ByteArrayInputStream(imageData);
        BufferedImage originalImage = ImageIO.read(bais);

        if (originalImage == null) {
            throw new IllegalArgumentException("O formato da imagem não é suportado ou os dados estão corrompidos.");
        }

        BufferedImage compressedImage = new BufferedImage(
                originalImage.getWidth(), originalImage.getHeight(), BufferedImage.TYPE_INT_RGB);
        compressedImage.getGraphics().drawImage(originalImage, 0, 0, null);

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(compressedImage, "jpg", baos);

        return baos.toByteArray();
    }
}
