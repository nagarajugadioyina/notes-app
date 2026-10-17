package com.example.notes;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class NoteController {

    private final NoteRepository repository;

    public NoteController(NoteRepository repository) {
        this.repository = repository;
    }

    // Health check: open the backend URL in a browser to confirm it is running
    @GetMapping("/")
    public String home() {
        return "Notes API is running";
    }

    @GetMapping("/api/notes")
    public List<Note> list() {
        return repository.findAll();
    }

    @PostMapping("/api/notes")
    public Note add(@RequestBody Note note) {
        note.setId(null);
        return repository.save(note);
    }

    @DeleteMapping("/api/notes/{id}")
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
