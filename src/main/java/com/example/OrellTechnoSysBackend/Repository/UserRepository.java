package com.example.OrellTechnoSysBackend.Repository;

import com.example.OrellTechnoSysBackend.Model.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    @Modifying
    @Transactional
    @Query(value = "SELECT * FROM usertable WHERE username = :username AND password = :password",nativeQuery = true)
    List<User> userLogin(@Param("username") String username, @Param("password") String password);




}
