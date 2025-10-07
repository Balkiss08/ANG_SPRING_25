package com.balkiss.pcs.entities;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
public class Pc {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idPc;
	private String nomPc;
	private String processeur;
	private Integer ram;
	private Integer disqueDur;
	private Double prixPc;

	@OneToMany(mappedBy = "pc")
	private List<Image> images;
	private String imagePath;

	@ManyToOne
	private Marque marque;

	public Pc(String nomPc, String processeur, Integer ram, Integer disque_dur, Double prix) {
		super();
		this.nomPc = nomPc;
		this.processeur = processeur;
		this.ram = ram;
		this.disqueDur = disque_dur;
		this.prixPc = prix;
	}

	public Pc() {
		// TODO Auto-generated constructor stub
	}

	public String getNomPc() {
		return nomPc;
	}

	public void setNomPc(String nomPc) {
		this.nomPc = nomPc;
	}

	public Long getIdPc() {
		return idPc;
	}

	public void setIdPc(Long idPc) {
		this.idPc = idPc;
	}

	public String getProcesseur() {
		return processeur;
	}

	public void setProcesseur(String processeur) {
		this.processeur = processeur;
	}

	public Integer getRam() {
		return ram;
	}

	public void setRam(Integer ram) {
		this.ram = ram;
	}

	public Integer getDisqueDur() {
		return disqueDur;
	}

	public void setDisqueDur(Integer disque_dur) {
		this.disqueDur = disque_dur;
	}

	public Double getPrixPc() {
		return prixPc;
	}

	public void setPrixPc(Double prixPc) {
		this.prixPc = prixPc;
	}

	public Marque getMarque() {
		return marque;
	}

	public void setMarque(Marque marque) {
		this.marque = marque;
	}

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	public List<Image> getImages() {
		return images;
	}

	public void setImages(List<Image> images) {
		this.images = images;
	}

	@Override
	public String toString() {
		return "Pc [idPc=" + idPc + ", nomPc=" + nomPc + ", processeur=" + processeur + ", ram=" + ram + ", disque_dur="
				+ disqueDur + ", prixPc=" + prixPc + ", marque=" + marque + "]";
	}

}
