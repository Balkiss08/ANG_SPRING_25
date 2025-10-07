package com.balkiss.pcs.service;

import java.io.IOException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import com.balkiss.pcs.entities.Image;

public interface ImageService {
	Image uplaodImage(MultipartFile file) throws IOException;

	Image getImageDetails(Long id) throws IOException;

	ResponseEntity<byte[]> getImage(Long id) throws IOException;

	void deleteImage(Long id);
	Image uplaodImagePc(MultipartFile file,Long idPc) throws IOException;
	List<Image> getImagesParPc(Long pcId);

}