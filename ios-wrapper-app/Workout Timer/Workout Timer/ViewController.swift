//
//  ViewController.swift
//  Workout Timer
//
//  Created by Gabe on 9/4/17.
//  Copyright © 2017 Gabe. All rights reserved.
//

import UIKit
import WebKit

class ViewController: UIViewController, WKUIDelegate, WKNavigationDelegate {
	
	@IBOutlet weak var webView: WKWebView!
	
	override var preferredStatusBarStyle: UIStatusBarStyle {
		return .lightContent
	}
	
	func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
		UIView.animate(withDuration: 0.3) {
			webView.alpha = 1;
		}
	}
	
	override func viewDidLoad() {
		super.viewDidLoad()
		// Do any additional setup after loading the view, typically from a nib.
		
		URLCache.shared.removeAllCachedResponses()
		URLCache.shared.diskCapacity = 0
		URLCache.shared.memoryCapacity = 0
		
		webView.navigationDelegate = self;
		
		webView.scrollView.isScrollEnabled = false;
		webView.scrollView.bounces = false;
		
		webView.alpha = 0;
		
		if let url = URL(string: "https://hire.gs/workout") {
		//if let url = URL(string: "http://127.0.0.1:3000/") {
			let request = URLRequest(url: url);
			webView.load(request);
		}
	}

	override func didReceiveMemoryWarning() {
		super.didReceiveMemoryWarning()
		// Dispose of any resources that can be recreated.
	}


}

