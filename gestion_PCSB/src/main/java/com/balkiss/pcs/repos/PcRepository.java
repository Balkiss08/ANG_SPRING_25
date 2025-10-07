package com.balkiss.pcs.repos;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import com.balkiss.pcs.entities.Marque;
import com.balkiss.pcs.entities.Pc;

@RepositoryRestResource(path = "rest")
public interface PcRepository extends JpaRepository<Pc, Long> {
	
	List<Pc> findByNomPc(String nom);
	List<Pc> findByNomPcContains(String nom);   
	
	@Query("select p from Pc p where p.nomPc like %:nom and p.prixPc > :prix")
	List<Pc> findByNomPrix (@Param("nom") String nom,@Param("prix") Double prix);
    
	@Query("select p from Pc p where p.marque = ?1")
	List<Pc> findByMarque (Marque marque);
	
	List<Pc> findByMarqueIdMarque(Long id);
	
	List<Pc> findByOrderByNomPcAsc();
	
	@Query("select p from Pc p order by p.nomPc ASC, p.prixPc DESC")
	List<Pc> trierPcsNomsPrix ();
	              




}
