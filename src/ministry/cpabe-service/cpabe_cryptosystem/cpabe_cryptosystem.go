package cpabe_cryptosystem

import (
	"crypto/rand"
	"encoding/base64"
	"errors"
	"os"

	cpabe "github.com/cloudflare/circl/abe/cpabe/tkn20"
)

var masterPublicKey = cpabe.PublicKey{}
var masterSecretKey = cpabe.SystemSecretKey{}

func Setup() {
	/*masterPublicKey, masterSecretKey, _ = cpabe.Setup(rand.Reader)

	p, _ := masterPublicKey.MarshalBinary()
	fmt.Printf("Public key (64 bytes): %+x\n", p[:64])
	mpk := base64.StdEncoding.EncodeToString(p)

	p, _ = masterSecretKey.MarshalBinary()
	fmt.Printf("Private key (64 bytes): %+x\n", p[:64])
	msk := base64.StdEncoding.EncodeToString(p)

	ioutil.WriteFile("MPK.txt", []byte(mpk), 0644)
	ioutil.WriteFile("MSK.txt", []byte(msk), 0644)*/

	MPK, _ := base64.StdEncoding.DecodeString(string(os.Getenv("MPK")))
	MSK, _ := base64.StdEncoding.DecodeString(string(os.Getenv("MSK")))

	masterPublicKey.UnmarshalBinary(MPK)
	masterSecretKey.UnmarshalBinary(MSK)
}

func GenerateSecretKey(attributes map[string]string) ([]byte, error) {
	SK := []byte{}
	attributesObj := cpabe.Attributes{}
	attributesObj.FromMap(attributes)
	SecretKey, err := masterSecretKey.KeyGen(rand.Reader, attributesObj)

	if err != nil {
		return SK, err
	}

	SK, err = SecretKey.MarshalBinary()
	return SK, err
}

func Encrypt(msg string, policyStr string) ([]byte, error) {
	policy := cpabe.Policy{}
	err := policy.FromString(policyStr)
	ct := []byte{}

	if err != nil {
		return ct, errors.New("policy error: error while parsing the policy")
	}

	return masterPublicKey.Encrypt(rand.Reader, policy, []byte(msg))
}

func Decrypt(SK []byte, ct []byte) ([]byte, error) {
	SecretKey := cpabe.AttributeKey{}
	err := SecretKey.UnmarshalBinary(SK)
	if err != nil {
		return nil, err
	}
	pt, err := SecretKey.Decrypt(ct)
	return pt, err
}
