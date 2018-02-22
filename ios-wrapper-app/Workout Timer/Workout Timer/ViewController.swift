//
//  ViewController.swift
//  Workout Timer
//
//  Created by Gabe on 9/4/17.
//  Copyright © 2017 Gabe. All rights reserved.
//

import UIKit

class ViewController: UIViewController, UIWebViewDelegate {
	
	@IBOutlet weak var webView: UIWebView!
	
	override var preferredStatusBarStyle: UIStatusBarStyle {
		return .lightContent
	}
	
	override func viewDidLoad() {
		super.viewDidLoad()
		// Do any additional setup after loading the view, typically from a nib.
		
		URLCache.shared.removeAllCachedResponses()
		URLCache.shared.diskCapacity = 0
		URLCache.shared.memoryCapacity = 0
		
		webView.delegate = self
		
		if let url = URL(string: "https://hire.gs/workout") {
			let request = URLRequest(url: url)
			webView.loadRequest(request)
		}
	}

	override func didReceiveMemoryWarning() {
		super.didReceiveMemoryWarning()
		// Dispose of any resources that can be recreated.
	}


}

