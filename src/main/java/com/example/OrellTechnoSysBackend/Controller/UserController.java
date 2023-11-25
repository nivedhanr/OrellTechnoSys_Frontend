package com.example.OrellTechnoSysBackend.Controller;

import com.example.OrellTechnoSysBackend.Model.User;
import com.example.OrellTechnoSysBackend.Repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;


@RestController
@RequestMapping("api/users")
public class UserController {


    @Autowired
    private UserRepository userRepository;
    @CrossOrigin(origins ="*")
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestParam("image") MultipartFile image, @RequestParam("name") String name, @RequestParam("dob") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date dob, @RequestParam("phn") String phn, @RequestParam("address") String address, @RequestParam("district") String district, @RequestParam("gender") String gender, @RequestParam("technologies") String technologies, @RequestParam("email") String email, @RequestParam("username") String username, @RequestParam("password") String password, @RequestParam("con_password") String con_password) {
        try {

            if (!password.equals(con_password)) {
                return new ResponseEntity<>("Password and Confirm Password do not match.", HttpStatus.BAD_REQUEST);
            }
            User user = new User();
            user.setName(name);
            user.setDob(dob);
            user.setPhn(phn);
            user.setAddress(address);
            user.setDistrict(district);
            user.setGender(gender);
            user.setTechnologies(technologies);
            user.setEmail(email);
            user.setUsername(username);
            user.setPassword(password);
            user.setCon_password(con_password);
            user.setImage(image.getBytes());

            userRepository.save(user);
            return new ResponseEntity<>("User registered successfully.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error registering user.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @CrossOrigin(origins = "*")
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userRepository.findById(id).orElse(null);

        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @CrossOrigin(origins = "*")
    @GetMapping(path ="/viewAll",produces = "application/json")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @CrossOrigin(origins = "*")
    @PostMapping(path = "/userlogin", consumes = "application/json", produces = "application/json")
    public HashMap<String, String> userLogin(@RequestBody User user){
        System.out.println(user.getUsername());
        List<User> result=(List<User>) userRepository.userLogin(user.getUsername(),user.getPassword());
        HashMap<String,String> st=new HashMap<>();
        if (result.size()==0){
            st.put("status","failed");
            st.put("message","user doesn't exist");

        }
        else{
            long id =result.get(0).getId();
            st.put("status","success");
            st.put("userid",String.valueOf(id));
            st.put("message","user login success");
        }
        return st;
    }


    @CrossOrigin(origins = "*")
    @PutMapping(value = "/{id}", consumes = "multipart/form-data")
    public ResponseEntity<User> updateUser(
            @PathVariable Long id,
            @RequestParam("name") String name,
            @RequestParam("dob") String dobStr,
            @RequestParam("phn") String phn,
            @RequestParam("address") String address,
            @RequestParam("district") String district,
            @RequestParam("gender") String gender,
            @RequestParam("technologies") String technologies,
            @RequestParam("email") String email,
            @RequestParam("password") String password,
//            @RequestParam("con_password") String con_password,
            @RequestPart(name = "image", required = false) MultipartFile image
    ) throws IOException {
        if (!userRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        User existingUser = userRepository.findById(id).get();


        Date dob = parseDate(dobStr);

        existingUser.setName(name);
        existingUser.setDob(dob);
        existingUser.setPhn(phn);
        existingUser.setAddress(address);
        existingUser.setDistrict(district);
        existingUser.setGender(gender);
        existingUser.setTechnologies(technologies);
        existingUser.setEmail(email);
        existingUser.setPassword(password);
        existingUser.setCon_password(password);

        if (image != null) {
            existingUser.setImage(image.getBytes());
        }


        User savedUser = userRepository.save(existingUser);

        return ResponseEntity.ok(savedUser);
    }
    private Date parseDate(String dateStr) {
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);
            return sdf.parse(dateStr);
        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid date format. Please use yyyy-MM-dd.");

        }
    }


}








