package main

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	cpabe_cryptosystem "main/cpabe_cryptosystem"
	"net/http"
)

func helloWorld(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Hello World!")
}

func generateKey(w http.ResponseWriter, r *http.Request) {
	// GET ATTRIBUTES
	var data map[string]interface{}
	var attributes = make(map[string]string)

	var input, _ = io.ReadAll(r.Body)
	if err := json.Unmarshal(input, &data); err != nil {
		fmt.Print(err)
	}

	for key, value := range data {
		strKey := fmt.Sprintf("%v", key)
		strValue := fmt.Sprintf("%v", value)

		attributes[strKey] = strValue
	}

	// GEN_KEY
	secret_key, _ := cpabe_cryptosystem.GenerateSecretKey(attributes)
	encodedText := base64.StdEncoding.EncodeToString([]byte(secret_key))
	fmt.Fprint(w, encodedText)
}

func encrypt(w http.ResponseWriter, r *http.Request) {
	// GET DATA
	var data map[string]string
	var input, _ = io.ReadAll(r.Body)
	if err := json.Unmarshal([]byte(input), &data); err != nil {
		fmt.Print(err)
	}

	ct, err := cpabe_cryptosystem.Encrypt(data["msg"], data["policy"])
	if err != nil {
		fmt.Print(err)
	}

	encodedText := base64.StdEncoding.EncodeToString([]byte(ct))
	fmt.Fprint(w, encodedText)
}

func decrypt(w http.ResponseWriter, r *http.Request) {
	// GET ATTRIBUTES
	var data map[string]string
	var input, _ = io.ReadAll(r.Body)
	if err := json.Unmarshal([]byte(input), &data); err != nil {
		fmt.Print(err)
	}

	secret_key, _ := base64.StdEncoding.DecodeString(data["secret_key"])
	ct, _ := base64.StdEncoding.DecodeString(data["ct"])

	pt, err := cpabe_cryptosystem.Decrypt([]byte(secret_key), []byte(ct))
	if err != nil {
		fmt.Fprintf(w, "%s", "SK cannot decrypt the included CT.")
	}

	fmt.Fprintf(w, "%s", pt)
}

func main() {
	cpabe_cryptosystem.Setup()
	http.HandleFunc("/", helloWorld)
	http.HandleFunc("/gen_key", generateKey)
	http.HandleFunc("/encrypt", encrypt)
	http.HandleFunc("/decrypt", decrypt)
	fmt.Println("Server listening on port 80")
	http.ListenAndServe(":80", nil)
}
