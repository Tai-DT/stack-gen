package main

import (
    "encoding/json"
    "net/http"
    "net/http/httptest"
    "testing"
)

func TestHelloHandler(t *testing.T) {
    req := httptest.NewRequest(http.MethodGet, "/api/hello", nil)
    rr := httptest.NewRecorder()
    helloHandler(rr, req)

    if rr.Code != http.StatusOK {
        t.Fatalf("expected status 200, got %d", rr.Code)
    }
    var m message
    if err := json.NewDecoder(rr.Body).Decode(&m); err != nil {
        t.Fatalf("decode response: %v", err)
    }
    if m.Message != "Hello from Go backend" {
        t.Errorf("unexpected message: %s", m.Message)
    }
}

func TestProductsHandler(t *testing.T) {
    req := httptest.NewRequest(http.MethodGet, "/api/products", nil)
    rr := httptest.NewRecorder()
    productsHandler(rr, req)

    if rr.Code != http.StatusOK {
        t.Fatalf("expected status 200, got %d", rr.Code)
    }
    var list []Product
    if err := json.NewDecoder(rr.Body).Decode(&list); err != nil {
        t.Fatalf("decode response: %v", err)
    }
    if len(list) != 2 {
        t.Errorf("expected 2 products, got %d", len(list))
    }
}

