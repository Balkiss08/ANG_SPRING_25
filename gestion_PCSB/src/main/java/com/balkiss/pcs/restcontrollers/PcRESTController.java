package com.balkiss.pcs.restcontrollers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.balkiss.pcs.dto.PcDTO;
import com.balkiss.pcs.entities.Pc;
import com.balkiss.pcs.repos.PcRepository;
import com.balkiss.pcs.service.PcService;
@RestController
@RequestMapping("/api/pcs")
@CrossOrigin(origins = "http://localhost:4200")
public class PcRESTController {
	@Autowired
	PcService pcService;
	@Autowired
	PcRepository pcRepository;
	
	@RequestMapping(path="all",method =RequestMethod.GET)
	public List<PcDTO> getAllPcs() {
	return pcService.getAllPcs();
	}
	
	@RequestMapping(value="/getbyid/{id}",method = RequestMethod.GET)
	public PcDTO getPcById(@PathVariable("id") Long id) {
	return pcService.getPc(id);
	 }
	
	@RequestMapping(path="/addpc",method = RequestMethod.POST)
	public PcDTO createPc(@RequestBody PcDTO pcDto) {
	return pcService.savePc(pcDto);
	}
	
	@RequestMapping(path="/updatepc",method = RequestMethod.PUT)
	public PcDTO updatePc(@RequestBody PcDTO pcDto) {
		return pcService.updatePc(pcDto);	}
	
	@RequestMapping(value="/delpc/{id}",method = RequestMethod.DELETE)
	public void deletePc(@PathVariable("id") Long id)
	{
		pcService.deletePcById(id);
	}
	
	
	@RequestMapping(value="/pcsmarq/{idMarque}",method = RequestMethod.GET)
	public List<Pc> getPcsByMarqueId(@PathVariable("idMarque") Long idMarque) {
	return pcService.findByMarqueIdMarque(idMarque);
	}

/*
	
	public PcDTO savePc(PcDTO pcdto) {
	 return convertEntityToDto(pcRepository.save(convertDtoToEntity(pcdto)));
	}
	*/



	
	

}
