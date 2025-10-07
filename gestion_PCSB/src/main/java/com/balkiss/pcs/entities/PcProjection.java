package com.balkiss.pcs.entities;

import org.springframework.data.rest.core.config.Projection;

@Projection(name = "nomProd", types = { Pc.class })
public interface PcProjection {
	public String getNomPc();
}

