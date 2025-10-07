package com.balkiss.pcs.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.balkiss.pcs.entities.Image;

public interface ImageRepository extends JpaRepository<Image , Long> {
}
