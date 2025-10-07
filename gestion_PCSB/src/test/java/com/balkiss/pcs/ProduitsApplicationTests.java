package com.balkiss.pcs;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.balkiss.pcs.entities.Marque;
import com.balkiss.pcs.entities.Pc;
import com.balkiss.pcs.repos.PcRepository;

@SpringBootTest
class PcsApplicationTests {

	@Test
	void contextLoads() {
	}
	
	@Autowired
	private PcRepository pcRepository;
	@Test
	 public void testCreatePc() {
		Pc pc1 = new Pc("PC Dell3","Intel Core i9-13900KF", 16,512,  2200.5);
		pcRepository.save(pc1);
	}	
	
	   @Test
		public void testFindPc()
		 {
			 Pc pc2 = pcRepository.findById(1L).get();		  
			 System.out.println(pc2);
		 }

		@Test
		public void testUpdatePc()
		 {
			 Pc pc3 = pcRepository.findById(1L).get();
			 pc3.setPrixPc(1000.0);
			 pcRepository.save(pc3);
		 }
		
		
	@Test
		public void testDeletePc()
		 {
			 pcRepository.deleteById(1L);;
			 
		 }

	   
	@Test
		public void testListerTousPcs()
		 {
			 List<Pc>  pcc = pcRepository.findAll();	 
				for (Pc p : pcc)
				{
					System.out.println(p);
				}	 
		 }
	
	@Test
	public void testFindByNomPc()
	 {
	List<Pc>  pcc = pcRepository.findByNomPc("AMD Ryzen 5 5600X");
			for (Pc p : pcc)
			{
				System.out.println(p);
			}
		
	 }
	
	@Test
	public void testFindByNomPcContains ()
	 {
	List<Pc> pcc=pcRepository.findByNomPc("Dell");
			for (Pc p : pcc)
			{
				System.out.println(p);
			} 
	}
	
	@Test
	public void testfindByNomPrix()
		 {
		List<Pc>  pcc = pcRepository.findByNomPrix("PC Dell2", 2200.0);
			for (Pc p : pcc)
				{
					System.out.println(p);
				}
			
		 }
	
	@Test
	public void testfindByMarque()
	 {
		Marque marq = new Marque();
		marq.setIdMarque(1L);			
		List<Pc>  pcc = pcRepository.findByMarque(marq);
			for (Pc p : pcc)
			{
				System.out.println(p);
			}
	 }
	
	@Test
	public void findByMarqueIdyy()
		 {			
			List<Pc>  pcc = pcRepository.findByMarqueIdMarque(1L);
				for (Pc p : pcc)
				{
					System.out.println(p);
				}
	       }
	
	@Test
	public void testfindByOrderByNomPcAsc()
	 {
		List<Pc>  pcc =    pcRepository.findByOrderByNomPcAsc();	 
			for (Pc p : pcc)
			{
				System.out.println(p);
			}
	 }
	
	@Test
	public void testTrierPcsNomsPrix()
	 {
		List<Pc>  pcc = pcRepository.trierPcsNomsPrix();	 
			for (Pc p : pcc)
			{
				System.out.println(p);
			}
	 }









	

}
