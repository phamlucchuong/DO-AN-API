package com.example.recruitment_website.repositories;

<<<<<<< HEAD
import java.util.List;

=======
>>>>>>> 54bd3df142c5d84d5be09e1d494e215c82fd8f86
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.recruitment_website.entities.JobEntity;

@Repository
public interface JobRepository extends JpaRepository<JobEntity, String> {
    // Define custom query methods if needed
<<<<<<< HEAD
    List<JobEntity> findByEmployerId(String employerId);
=======
    // List<JobEntity> findByEmployerId(String employerId);
>>>>>>> 54bd3df142c5d84d5be09e1d494e215c82fd8f86
}