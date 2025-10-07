package com.balkiss.pcs.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.balkiss.pcs.dto.PcDTO;
import com.balkiss.pcs.entities.Marque;
import com.balkiss.pcs.entities.Pc;
import com.balkiss.pcs.repos.ImageRepository;
import com.balkiss.pcs.repos.PcRepository;

@Service
public class PcServiceImpl implements PcService {

	@Autowired
	PcRepository pcRepository;

	@Autowired
	ImageRepository imageRepository;

	@Autowired
	ModelMapper modelMapper;

	@Override
	public PcDTO savePc(PcDTO pcDto) {
		return convertEntityToDto(pcRepository.save(convertDtoToEntity(pcDto)));
	}

	@Override
	public PcDTO getPc(Long id) {
		return convertEntityToDto(pcRepository.findById(id).get());

	}

	@Override
	public List<PcDTO> getAllPcs() {
		return pcRepository.findAll().stream().map(this::convertEntityToDto).collect(Collectors.toList());
	}

	@Override
	public PcDTO updatePc(PcDTO pc) {
		return convertEntityToDto(pcRepository.save(convertDtoToEntity(pc)));
	}

	@Override
	public void deletePc(Pc p) {
		pcRepository.delete(p);

	}

	@Override
	public List<Pc> findByNomPc(String nom) {
		return pcRepository.findByNomPc(nom);
	}

	@Override
	public List<Pc> findByNomPcContains(String nom) {
		return pcRepository.findByNomPcContains(nom);
	}

	@Override
	public List<Pc> findByNomPrix(String nom, Double prix) {
		return pcRepository.findByNomPrix(nom, prix);
	}

	@Override
	public List<Pc> findByMarque(Marque marque) {
		return pcRepository.findByMarque(marque);
	}

	@Override
	public List<Pc> findByMarqueIdMarque(Long id) {
		return pcRepository.findByMarqueIdMarque(id);
	}

	@Override
	public List<Pc> findByOrderByNomPcAsc() {
		return pcRepository.findByOrderByNomPcAsc();
	}

	@Override
	public List<Pc> trierPcsNomsPrix() {
		return pcRepository.trierPcsNomsPrix();
	}

	/*
	 * @Override public void deletePcById(Long id) { Pc p = getPc(id); // try { //
	 * Files.delete(Paths.get(System.getProperty("user.home")+"/images/"+p.
	 * getImagePath())); // } catch (IOException e) { //e.printStackTrace(); // }
	 * 
	 * pcRepository.deleteById(id); }
	 */
	@Override
	public void deletePcById(Long id) {
		Pc pc = pcRepository.findById(id).orElseThrow(() -> new RuntimeException("PC not found with id: " + id));
		// supprimer toutes les images associées à ce PC directement via le repo
		if (pc.getImages() != null) {
			pc.getImages().forEach(img -> {
				imageRepository.deleteById(img.getIdImage());
			});
		}

		pcRepository.deleteById(id);
	}
/*
	@Override
	public PcDTO convertEntityToDto(Pc pc) {
		PcDTO pcDTO = new PcDTO();
		pcDTO.setIdPc(pc.getIdPc());
		pcDTO.setNomPc(pc.getNomPc());
		pcDTO.setProcesseur(pc.getProcesseur());
		pcDTO.setRam(pc.getRam());
		pcDTO.setDisqueDur(pc.getDisqueDur());
		pcDTO.setPrixPc(pc.getPrixPc());
		pcDTO.setMarque(pc.getMarque());
		pcDTO.setNomMarque(pc.getMarque().getNomMarque());
		return pcDTO;

	}*/
	@Override
	public PcDTO convertEntityToDto(Pc pc) {
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
		PcDTO pcDTO = modelMapper.map(pc, PcDTO.class);
	 return pcDTO;
	 }

	/*
	@Override
	public Pc convertDtoToEntity(PcDTO pcDto) {
		Pc pc = new Pc();
		pc.setIdPc(pcDto.getIdPc());
		pc.setNomPc(pcDto.getNomPc());
		pc.setProcesseur(pcDto.getProcesseur());
		pc.setRam(pcDto.getRam());
		pc.setDisqueDur(pcDto.getDisqueDur());
		pc.setPrixPc(pcDto.getPrixPc());
		return pc;
*/
		@Override
		public Pc convertDtoToEntity(PcDTO pcDto) {
			
			Pc pc= new Pc();
			pc = modelMapper.map(pcDto, Pc.class);
			   return pc;
		
	}
}