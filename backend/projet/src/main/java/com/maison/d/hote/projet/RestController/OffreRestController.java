package com.maison.d.hote.projet.RestController;

import com.maison.d.hote.projet.Entity.contact;
import com.maison.d.hote.projet.Entity.offre;
import com.maison.d.hote.projet.Repository.OffreRepository;
import com.maison.d.hote.projet.Services.OffreServices;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

@RestController
@CrossOrigin("*")
@RequestMapping(value ="/offre")
public class OffreRestController {
    @Autowired
    OffreServices offreServices ;
    private OffreRepository offreRepository;
    @Autowired

    public OffreRestController(OffreRepository offreRepository) {
        this.offreRepository = offreRepository;



    }
    @RequestMapping(method = RequestMethod.POST )

    public offre ajoutOffre(@RequestBody offre offre){
        com.maison.d.hote.projet.Entity.offre savedUser = offreRepository.save(offre);
        return offreServices.ajouterOffre(offre);


    }
    @RequestMapping(value = "/{id}" ,method = RequestMethod.PUT)
    public offre modifieroffre(@PathVariable("id")Long id, @RequestBody offre offre){

        offre newOffre = offreServices.modiferOffre(offre);
        return newOffre;
    }
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE )
//RequestBody:tekhdh vrb tabaathhom lel contrl kn sar c bon snn erreur
    public void suppOffre(@PathVariable("id") Long id){
        offreServices.supprimerOffre(id);

    }
    @RequestMapping(method = RequestMethod.GET )
//RequestBody:tekhdh vrb tabaathhom lel contrl kn sar c bon snn erreur
    public List<offre> afficherOffre(){
        return offreServices.afficherOffre();

    }
    @RequestMapping(value = "/{id}" , method = RequestMethod.GET)
    public Optional<offre> getOffreById(@PathVariable("id") Long id){

        Optional<offre> offre = offreServices.afficherOffreById(id);
        return offre;
    }


}
