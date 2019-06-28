package com.pabloriosramirez.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.*;
import java.security.Principal;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@Controller
public class MainController {

    @Autowired
    private ServletContext servletContext;

    private static final String FILE_PATH_CV = "Pablo Rios.pdf";
    private static final String FILE_PATH_SFIA = "Pablo Rios - SFIA.pdf";

    @RequestMapping(value = "/", method = GET)
    public String mainPage(HttpSession session, Model model) {
        model.addAttribute("title", "Pablo Ríos Ramírez");
        model.addAttribute("description", "Pablo Ríos Ramírez");
        return "index";
    }

    @RequestMapping("/{document}")
    public ResponseEntity<InputStreamResource> downloadPage(@PathVariable("document") String document) throws IOException {
        File file;
        switch (document.toUpperCase()) {
            case "CV":
                file = ResourceUtils.getFile("classpath:files/" + FILE_PATH_CV);
                break;
            case "SFIA":
                file = ResourceUtils.getFile("classpath:files/" + FILE_PATH_SFIA);
                break;
            default:
                throw new FileNotFoundException();
        }

        MediaType mediaType = getMediaTypeForFileName(this.servletContext, document);
        InputStreamResource resource = new InputStreamResource(new FileInputStream(file));

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + file.getName())
                .contentType(mediaType)
                .contentLength(file.length()) //
                .body(resource);
    }

    public static MediaType getMediaTypeForFileName(ServletContext servletContext, String fileName) {
        String mineType = servletContext.getMimeType(fileName);
        try {
            MediaType mediaType = MediaType.parseMediaType(mineType);
            return mediaType;
        } catch (Exception e) {
            return MediaType.APPLICATION_OCTET_STREAM;
        }
    }


}
