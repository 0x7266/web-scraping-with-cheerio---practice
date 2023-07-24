fn main() {
    println!("{:?}", getPage("https://globo.com"));
}

fn getPage(url: &str) -> Result<String, reqwest::Error> {
    match reqwest::blocking::get(url) {
        Ok(response) => response.text(),
        Err(err) => Err(err),
    }
}
