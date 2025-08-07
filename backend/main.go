package main

import (
	"encoding/json"
	"log"
	"net/http"
)

type message struct {
	Message string `json:"message"`
}

// Product represents an item the business offers.
type Product struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

// Project showcases delivered work.
type Project struct {
	ID      int    `json:"id"`
	Title   string `json:"title"`
	Summary string `json:"summary"`
}

// License highlights certifications or permits.
type License struct {
	ID     int    `json:"id"`
	Title  string `json:"title"`
	Issuer string `json:"issuer"`
	Year   int    `json:"year"`
}

// Contact contains basic contact information.
type Contact struct {
	Email   string `json:"email"`
	Phone   string `json:"phone"`
	Address string `json:"address"`
}

var (
	products = []Product{
		{ID: 1, Name: "Product A", Description: "Description of product A"},
		{ID: 2, Name: "Product B", Description: "Description of product B"},
	}

	projects = []Project{
		{ID: 1, Title: "Project Alpha", Summary: "Summary of project Alpha"},
		{ID: 2, Title: "Project Beta", Summary: "Summary of project Beta"},
	}

	licenses = []License{
		{ID: 1, Title: "License One", Issuer: "Gov", Year: 2021},
		{ID: 2, Title: "License Two", Issuer: "Org", Year: 2023},
	}

	contact = Contact{
		Email:   "info@example.com",
		Phone:   "+1-555-0100",
		Address: "123 Business Rd, City",
	}
)

func jsonHandler(data interface{}) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(data)
	}
}

func helloHandler(w http.ResponseWriter, r *http.Request) {
	jsonHandler(message{Message: "Hello from Go backend"})(w, r)
}

func main() {
	http.HandleFunc("/api/hello", helloHandler)
	http.HandleFunc("/api/products", jsonHandler(products))
	http.HandleFunc("/api/projects", jsonHandler(projects))
	http.HandleFunc("/api/licenses", jsonHandler(licenses))
	http.HandleFunc("/api/contact", jsonHandler(contact))
	log.Println("Server listening on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
