use std::env::args;

fn main() {
    // println!("{:?}", getPage("https://globo.com"));
    let args: Vec<String> = args().collect();
    let page = getPage(&args[1]);
}

fn getPage(url: &str) -> Result<String, reqwest::Error> {
    match reqwest::blocking::get(url) {
        Ok(response) => response.text(),
        Err(err) => Err(err),
    }
}
