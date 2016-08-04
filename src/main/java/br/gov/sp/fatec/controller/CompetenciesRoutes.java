package br.gov.sp.fatec.controller;

import static spark.Spark.get; // select
import static spark.Spark.options;
import static spark.Spark.put; // update

import java.util.List;

import static spark.Spark.delete; // delete
import static spark.Spark.post; // insert

/*import java.sql.Date;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import br.com.fatec.entity.Course;
*/
import com.google.gson.Gson;

import br.gov.sp.fatec.commons.JsonUtil;
import br.gov.sp.fatec.connection.CorsFilter;
import br.gov.sp.fatec.entity.Competence;

import br.gov.sp.fatec.model.ModelCompetencies;

public class CompetenciesRoutes {
	
	public static void getCompetencies() {
		ModelCompetencies modelCompetencies = new ModelCompetencies();
		Gson gson = new Gson();
		
		options("/map/competence/*", (req, res) -> {
			res.status(200);
			return CorsFilter.getCorsheaders();
		});
		
		// insert
		post("/map/competence/", (req, res) -> {
			String competenceData = req.body();
			
			byte ptext[] = competenceData.getBytes(); 
			String value = new String(ptext, "UTF-8"); 
			
			Competence competence = gson.fromJson(value, Competence.class);
			boolean operation = false;
			try{
				operation = modelCompetencies.insertCompetence(competence);
				if(operation){
					res.status(200);
					return "SUCESS";
				}else{
					res.status(600);
					return "FAIL";
				}
			}catch(Exception e){
				e.printStackTrace();
				return "ops, an error with inserting, check the fields!";
			}
		}, JsonUtil.json());
		
		// delete
		delete("/map/competence/", "application/json", (req, res) -> {
			Long competenceCode = Long.parseLong(req.queryParams("competenceCode"));
			boolean operation = false;
			try{
				operation = modelCompetencies.deleteCompetence(competenceCode);
				if(operation){
					res.status(200);
					return "SUCESS";
				}else{
					res.status(600);
					return "FAIL";
				}
			}catch(Exception e){
				e.printStackTrace();
				res.status(600);
				return "ops, an error with deleting, check the fields!";
			}
		}, JsonUtil.json());
		
		// update
		put("/map/competence/", (req, res) -> {
			String competenceData = req.body();
			
			byte ptext[] = competenceData.getBytes(); 
			String value = new String(ptext, "UTF-8");
			
			Competence competence = gson.fromJson(value, Competence.class);
			boolean operation = false;
			try{
				operation = modelCompetencies.updateCompetence(competence);
				if(operation){
					res.status(200);
					return "SUCESS";
				}else{
					res.status(600);
					return "FAIL";
				}
			}catch(NullPointerException e){
				e.printStackTrace();
				return "ops, an error with updating, check the fields!";
			}
		}, JsonUtil.json());
		
		// search by code
		get("/map/searchCompetenciesById", "application/json", (req, res) -> {
			Long competenceCode = Long.parseLong(req.queryParams("competenceCode"));
			Competence competence = null;
			try{
				competence = modelCompetencies.searchCompetenceByCode(competenceCode);
				if(competence != null){
					res.status(200);
					return "SUCESS";
				}else{
					res.status(600);
					return "FAIL";
				}
			}catch(Exception e){
				e.printStackTrace();
				res.status(400);
				return "It was not possible to find a Competence";
			}
		} , JsonUtil.json());
		
		// search all
		get("/map/competence/search/all", (req, res) -> {
			List<Competence> competencias = null;
			try{
				competencias = modelCompetencies.searchAllCompetence();
				if(competencias.size() > 0){
					res.status(200);
					return competencias;
				}else{
					res.status(600);
					return "FAIL";
				}
			}catch(NullPointerException e){
				e.printStackTrace();
				return "It wasin't possible find all Competences!";
			}
		} , JsonUtil.json());
	}
}
