package com.example.recruitment_website.repositories;

<<<<<<< HEAD
import java.util.Optional;

=======
>>>>>>> 54bd3df142c5d84d5be09e1d494e215c82fd8f86
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.recruitment_website.entities.EmployerEntity;

@Repository
public interface  EmployerRepository extends JpaRepository<EmployerEntity, String> {
<<<<<<< HEAD
    Optional<EmployerEntity> findByAccountId(String accountId);
=======
    // Optional<EmployerEntity> findByAccountId(String accountId);
>>>>>>> 54bd3df142c5d84d5be09e1d494e215c82fd8f86
}
