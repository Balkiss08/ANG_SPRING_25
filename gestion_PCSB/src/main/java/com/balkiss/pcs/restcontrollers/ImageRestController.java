package com.balkiss.pcs.restcontrollers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.balkiss.pcs.dto.PcDTO;
import com.balkiss.pcs.entities.Image;
import com.balkiss.pcs.entities.Pc;
import com.balkiss.pcs.service.ImageService;
import com.balkiss.pcs.service.PcService;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/image")
@CrossOrigin(origins = "*")
public class ImageRestController {
    @Autowired
    ImageService imageService;

    @Autowired
    PcService pcService;

    @RequestMapping(value = "/uploadFS/{id}", method = RequestMethod.POST)
    public void uploadImageFS(@RequestParam("image") MultipartFile file, @PathVariable("id") Long id) throws IOException {
        PcDTO pcDto = pcService.getPc(id);
        pcDto.setImagePath(id + ".jpg");

        Files.write(Paths.get(System.getProperty("user.home") + "/images/" + pcDto.getImagePath()), file.getBytes());
        pcService.savePc(pcDto);
    }

    @RequestMapping(value = "/loadfromFS/{id}", method = RequestMethod.GET, produces = MediaType.IMAGE_JPEG_VALUE)
    public byte[] getImageFS(@PathVariable("id") Long id) throws IOException {
        PcDTO pcDto = pcService.getPc(id);
        
        // Check if imagePath is null or empty
        if (pcDto.getImagePath() == null || pcDto.getImagePath().trim().isEmpty()) {
            // Return default image
            return Files.readAllBytes(Paths.get(System.getProperty("user.home") + "/images/default.jpg"));
        }
        
        return Files.readAllBytes(Paths.get(System.getProperty("user.home") + "/images/" + pcDto.getImagePath()));
    }

    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    public Image uploadImage(@RequestParam("image") MultipartFile file) throws IOException {
        return imageService.uplaodImage(file);
    }

    @PostMapping(value = "/uploadImagePc/{idPc}")
    public Image uploadMultiImages(@RequestParam("image") MultipartFile file, @PathVariable("idPc") Long idPc) throws IOException {
        return imageService.uplaodImagePc(file, idPc);
    }

    @RequestMapping(value = "/getImagesPc/{idPc}", method = RequestMethod.GET)
    public List<Image> getImagesPc(@PathVariable("idPc") Long idPc) throws IOException {
        return imageService.getImagesParPc(idPc);
    }

    @RequestMapping(value = "/get/info/{id}", method = RequestMethod.GET)
    public Image getImageDetails(@PathVariable("id") Long id) throws IOException {
        return imageService.getImageDetails(id);
    }

    @RequestMapping(value = "/load/{id}", method = RequestMethod.GET)
    public ResponseEntity<byte[]> getImage(@PathVariable("id") Long id) throws IOException {
        return imageService.getImage(id);
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public void deleteImage(@PathVariable("id") Long id) {
        imageService.deleteImage(id);
    }

    @RequestMapping(value = "/update", method = RequestMethod.PUT)
    public Image UpdateImage(@RequestParam("image") MultipartFile file) throws IOException {
        return imageService.uplaodImage(file);
    }
}