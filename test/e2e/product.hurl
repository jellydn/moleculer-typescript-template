# Add a product to cart
POST http://localhost:{{PORT}}/api/product/cart
{

}
HTTP 422
[Asserts]
jsonpath "$.message" == "Parameters validation error!"

POST http://localhost:{{PORT}}/api/product/cart
{
	"name": "Iphone 15 Pro"
}

HTTP 422
[Asserts]
jsonpath "$.message" == "Parameters validation error!"

POST http://localhost:{{PORT}}/api/product/cart
{
	"name": "Iphone 15 Pro",
	"qty": 1
}

HTTP 200
[Asserts]
jsonpath "$.success" == true
jsonpath "$.message" == "You added 1 Iphone 15 Pro to your cart"
jsonpath "$.billing" not exists

POST http://localhost:{{PORT}}/api/product/cart
{
	"name": "Iphone 15 Pro",
	"qty": 1,
	"billing": {
		"zip": 123456
	}
}
HTTP 422
[Asserts]
jsonpath "$.message" == "Parameters validation error!"

POST http://localhost:{{PORT}}/api/product/cart
{
	"name": "Iphone 15 Pro",
	"qty": 1,
	"billing": {
		"city": "Singapore",
		"country": "Singapore",
		"zip": 123456
	}
}
HTTP 200
[Asserts]
jsonpath "$.billing.city" == "Singapore"
jsonpath "$.billing.country" == "Singapore"
jsonpath "$.billing.zip" == 123456

POST http://localhost:{{PORT}}/api/product/cart
{
	"name": "Iphone 15 Pro",
	"qty": 1,
	"billing": {
		"city": "Singapore",
		"country": "Singapore",
		"zip": 123456
	},
	"buyer": {
		"name": "Dung Huynh"
	}
}
HTTP 422
[Asserts]
jsonpath "$.message" == "Parameters validation error!"
jsonpath "$.data[0].message" == "Unrecognized key(s) in object: 'buyer'"
