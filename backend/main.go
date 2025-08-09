package main

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"strings"
)

type message struct {
	Message string `json:"message"`
}

// Product represents an item the business offers.
type LocalizedText map[string]string

// Product represents an item the business offers.
type Product struct {
	ID          int           `json:"id"`
	Name        LocalizedText `json:"name"`
	Description LocalizedText `json:"description"`
}

// Project showcases delivered work.
type Project struct {
	ID      int           `json:"id"`
	Title   LocalizedText `json:"title"`
	Summary LocalizedText `json:"summary"`
}

// License highlights certifications or permits.
type License struct {
	ID     int           `json:"id"`
	Title  LocalizedText `json:"title"`
	Issuer string        `json:"issuer"`
	Year   int           `json:"year"`
}

// Contact contains basic contact information.
type Contact struct {
	Email   string `json:"email"`
	Phone   string `json:"phone"`
	Address string `json:"address"`
}

var (
	products = []Product{
		{ID: 1, Name: LocalizedText{"en": "Product A", "ja": "製品A", "vi": "Sản phẩm A", "ko": "제품 A"}, Description: LocalizedText{"en": "Description of product A", "ja": "製品Aの説明", "vi": "Mô tả sản phẩm A", "ko": "제품 A 설명"}},
		{ID: 2, Name: LocalizedText{"en": "Product B", "ja": "製品B", "vi": "Sản phẩm B", "ko": "제품 B"}, Description: LocalizedText{"en": "Description of product B", "ja": "製品Bの説明", "vi": "Mô tả sản phẩm B", "ko": "제품 B 설명"}},
	}
	nextProductID = 3

	projects = []Project{
		{ID: 1, Title: LocalizedText{"en": "Project Alpha", "ja": "プロジェクトアルファ", "vi": "Dự án Alpha", "ko": "프로젝트 알파"}, Summary: LocalizedText{"en": "Summary of project Alpha", "ja": "プロジェクトアルファの概要", "vi": "Tóm tắt dự án Alpha", "ko": "프로젝트 알파 요약"}},
		{ID: 2, Title: LocalizedText{"en": "Project Beta", "ja": "プロジェクトベータ", "vi": "Dự án Beta", "ko": "프로젝트 베타"}, Summary: LocalizedText{"en": "Summary of project Beta", "ja": "プロジェクトベータの概要", "vi": "Tóm tắt dự án Beta", "ko": "프로젝트 베타 요약"}},
	}
	nextProjectID = 3

	licenses = []License{
		{ID: 1, Title: LocalizedText{"en": "License One", "ja": "ライセンス1", "vi": "Giấy phép 1", "ko": "라이선스 1"}, Issuer: "Gov", Year: 2021},
		{ID: 2, Title: LocalizedText{"en": "License Two", "ja": "ライセンス2", "vi": "Giấy phép 2", "ko": "라이선스 2"}, Issuer: "Org", Year: 2023},
	}
	nextLicenseID = 3

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

func productsHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		json.NewEncoder(w).Encode(products)
	default:
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
	}
}

func adminProductsHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodPost:
		var p Product
		if err := json.NewDecoder(r.Body).Decode(&p); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		p.ID = nextProductID
		nextProductID++
		products = append(products, p)
		json.NewEncoder(w).Encode(p)
	default:
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
	}
}

func adminProductIDHandler(w http.ResponseWriter, r *http.Request) {
	idStr := strings.TrimPrefix(r.URL.Path, "/api/admin/products/")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "invalid id", http.StatusBadRequest)
		return
	}
	switch r.Method {
	case http.MethodPut:
		var p Product
		if err := json.NewDecoder(r.Body).Decode(&p); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		for i := range products {
			if products[i].ID == id {
				p.ID = id
				products[i] = p
				json.NewEncoder(w).Encode(p)
				return
			}
		}
		http.NotFound(w, r)
	case http.MethodDelete:
		for i := range products {
			if products[i].ID == id {
				products = append(products[:i], products[i+1:]...)
				w.WriteHeader(http.StatusNoContent)
				return
			}
		}
		http.NotFound(w, r)
	default:
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
	}
}

func projectsHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		json.NewEncoder(w).Encode(projects)
	default:
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
	}
}

func adminProjectsHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodPost:
		var p Project
		if err := json.NewDecoder(r.Body).Decode(&p); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		p.ID = nextProjectID
		nextProjectID++
		projects = append(projects, p)
		json.NewEncoder(w).Encode(p)
	default:
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
	}
}

func adminProjectIDHandler(w http.ResponseWriter, r *http.Request) {
	idStr := strings.TrimPrefix(r.URL.Path, "/api/admin/projects/")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "invalid id", http.StatusBadRequest)
		return
	}
	switch r.Method {
	case http.MethodPut:
		var p Project
		if err := json.NewDecoder(r.Body).Decode(&p); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		for i := range projects {
			if projects[i].ID == id {
				p.ID = id
				projects[i] = p
				json.NewEncoder(w).Encode(p)
				return
			}
		}
		http.NotFound(w, r)
	case http.MethodDelete:
		for i := range projects {
			if projects[i].ID == id {
				projects = append(projects[:i], projects[i+1:]...)
				w.WriteHeader(http.StatusNoContent)
				return
			}
		}
		http.NotFound(w, r)
	default:
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
	}
}

func licensesHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		json.NewEncoder(w).Encode(licenses)
	default:
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
	}
}

func adminLicensesHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodPost:
		var l License
		if err := json.NewDecoder(r.Body).Decode(&l); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		l.ID = nextLicenseID
		nextLicenseID++
		licenses = append(licenses, l)
		json.NewEncoder(w).Encode(l)
	default:
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
	}
}

func adminLicenseIDHandler(w http.ResponseWriter, r *http.Request) {
	idStr := strings.TrimPrefix(r.URL.Path, "/api/admin/licenses/")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "invalid id", http.StatusBadRequest)
		return
	}
	switch r.Method {
	case http.MethodPut:
		var l License
		if err := json.NewDecoder(r.Body).Decode(&l); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		for i := range licenses {
			if licenses[i].ID == id {
				l.ID = id
				licenses[i] = l
				json.NewEncoder(w).Encode(l)
				return
			}
		}
		http.NotFound(w, r)
	case http.MethodDelete:
		for i := range licenses {
			if licenses[i].ID == id {
				licenses = append(licenses[:i], licenses[i+1:]...)
				w.WriteHeader(http.StatusNoContent)
				return
			}
		}
		http.NotFound(w, r)
	default:
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
	}
}

func contactHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		json.NewEncoder(w).Encode(contact)
	case http.MethodPut:
		var c Contact
		if err := json.NewDecoder(r.Body).Decode(&c); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		contact = c
		json.NewEncoder(w).Encode(contact)
	default:
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
	}
}

func main() {
	http.HandleFunc("/api/hello", helloHandler)
	http.HandleFunc("/api/products", productsHandler)
	http.HandleFunc("/api/projects", projectsHandler)
	http.HandleFunc("/api/licenses", licensesHandler)
	http.HandleFunc("/api/contact", contactHandler)

	http.HandleFunc("/api/admin/products", adminProductsHandler)
	http.HandleFunc("/api/admin/products/", adminProductIDHandler)
	http.HandleFunc("/api/admin/projects", adminProjectsHandler)
	http.HandleFunc("/api/admin/projects/", adminProjectIDHandler)
	http.HandleFunc("/api/admin/licenses", adminLicensesHandler)
	http.HandleFunc("/api/admin/licenses/", adminLicenseIDHandler)

	log.Println("Server listening on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
