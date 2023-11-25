package com.example.OrellTechnoSysBackend.Model;

import jakarta.persistence.*;


import java.util.Date;


@Entity
@Table(name = "Usertable")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Date dob;
    private String phn;
    private String address;
    private String district;
    private String gender;
    private String technologies;
    private String email;
    private String username;
    private String password;
    private String con_password; // New field
    @Lob
    @Column(name = "image", columnDefinition = "LONGBLOB")
    private byte[] image;

        // Getters and setters for all fields, including image and con_password

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public String getPhn() {
        return phn;
    }

    public void setPhn(String phn) {
        this.phn = phn;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getTechnologies() {
        return technologies;
    }

    public void setTechnologies(String technologies) {
        this.technologies = technologies;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCon_password() {
        return con_password;
    }

    public void setCon_password(String con_password) {
        this.con_password = con_password;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public User() {
    }

    public User(Long id, String name, Date dob, String phn, String address, String district, String gender, String technologies, String email, String username, String password, String con_password, byte[] image) {
        this.id = id;
        this.name = name;
        this.dob = dob;
        this.phn = phn;
        this.address = address;
        this.district = district;
        this.gender = gender;
        this.technologies = technologies;
        this.email = email;
        this.username = username;
        this.password = password;
        this.con_password = con_password;
        this.image = image;
    }


}

