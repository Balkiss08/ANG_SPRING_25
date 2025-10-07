package com.balkiss.pcs.service;

import java.util.List;

import com.balkiss.pcs.dto.PcDTO;
import com.balkiss.pcs.entities.Marque;
import com.balkiss.pcs.entities.Pc;

public interface PcService {

	PcDTO savePc(PcDTO pcDto);
	
	PcDTO getPc(Long id);
	
	List<PcDTO> getAllPcs();

	PcDTO updatePc(PcDTO pcDto);

	void deletePc(Pc p);

	void deletePcById(Long id);

	List<Pc> findByNomPc(String nom);

	List<Pc> findByNomPcContains(String nom);

	List<Pc> findByNomPrix(String nom, Double prix);

	List<Pc> findByMarque(Marque marque);

	List<Pc> findByMarqueIdMarque(Long id);

	List<Pc> findByOrderByNomPcAsc();

	List<Pc> trierPcsNomsPrix();

	PcDTO convertEntityToDto(Pc p);

	Pc convertDtoToEntity(PcDTO pcDto);

}
