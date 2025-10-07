package com.balkiss.pcs.dto;
import com.balkiss.pcs.entities.Marque;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PcDTO {
	private Long idPc;
	private String nomPc;
	private String processeur;
	private Integer ram;
	private Integer disqueDur;
	private Double prixPc;
	private Marque marque;
	private String nomMarque;
	private String imagePath;
}
