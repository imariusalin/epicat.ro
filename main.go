package main

import (
	"encoding/json"
	"fmt"
	"net"
	"net/http"
)

type DomainInfo struct {
	Status      string   `json:"status"`
	IP          string   `json:"ip"`
	NameServers []string `json:"nameservers"`
	ReverseDNS  string   `json:"reversedns"`
}

func checkDomain(w http.ResponseWriter, r *http.Request) {
	domain := r.URL.Query().Get("domain")
	info := DomainInfo{}

	// Check if the domain is online
	_, err := http.Get("http://" + domain)
	if err != nil {
		info.Status = "offline"
	} else {
		info.Status = "online"
	}

	// Get IP address
	ips, err := net.LookupIP(domain)
	if err == nil && len(ips) > 0 {
		info.IP = ips[0].String()
	}

	// Get name servers
	ns, err := net.LookupNS(domain)
	if err == nil {
		for _, n := range ns {
			info.NameServers = append(info.NameServers, n.Host)
		}
	}

	// Get reverse DNS
	ptr, err := net.LookupAddr(info.IP)
	if err == nil && len(ptr) > 0 {
		info.ReverseDNS = ptr[0]
	}

	json.NewEncoder(w).Encode(info)
}

func main() {
	http.Handle("/", http.FileServer(http.Dir("./static")))
	http.HandleFunc("/check", checkDomain)

	fmt.Println("Server started at :7001")
	http.ListenAndServe(":7001", nil)
}
