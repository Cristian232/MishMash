import os
import random
import xml.etree.ElementTree as ET
from faker import Faker

# Create a Faker instance for generating fake data
fake = Faker()

# XML template
xml_template = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2" xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2" xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2" xmlns:ns4="urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2 http://docs.oasis-open.org/ubl/os-UBL-2.1/xsd/maindoc/UBL-Invoice-2.1.xsd">
    <cbc:CustomizationID>urn:cen.eu:en16931:2017#compliant#urn:efactura.mfinante.ro:CIUS-RO:1.0.1</cbc:CustomizationID>
    <cbc:ID>{invoice_id}</cbc:ID>
    <cbc:IssueDate>{issue_date}</cbc:IssueDate>
    <cbc:DueDate>{due_date}</cbc:DueDate>
    <cbc:InvoiceTypeCode>{invoice_type_code}</cbc:InvoiceTypeCode>
    <cbc:DocumentCurrencyCode>{document_currency_code}</cbc:DocumentCurrencyCode>
    <cbc:TaxCurrencyCode>{tax_currency_code}</cbc:TaxCurrencyCode>
    <cac:InvoicePeriod>
        <cbc:DescriptionCode>{description_code}</cbc:DescriptionCode>
    </cac:InvoicePeriod>
    <cac:AccountingSupplierParty>
        <cac:Party>
            <cac:PartyName>
                <cbc:Name>{supplier_name}</cbc:Name>
            </cac:PartyName>
            <cac:PostalAddress>
                <cbc:StreetName>{supplier_street}</cbc:StreetName>
                <cbc:CityName>{supplier_city}</cbc:CityName>
                <cbc:PostalZone>{supplier_postal_zone}</cbc:PostalZone>
                <cbc:CountrySubentity>{supplier_country_subentity}</cbc:CountrySubentity>
                <cac:Country>
                    <cbc:IdentificationCode>{supplier_country_code}</cbc:IdentificationCode>
                </cac:Country>
            </cac:PostalAddress>
            <cac:PartyTaxScheme>
                <cbc:CompanyID>{supplier_cui}</cbc:CompanyID>
                <cac:TaxScheme>
                    <cbc:ID>VAT</cbc:ID>
                </cac:TaxScheme>
            </cac:PartyTaxScheme>
            <cac:PartyLegalEntity>
                <cbc:RegistrationName>{supplier_registration_name}</cbc:RegistrationName>
            </cac:PartyLegalEntity>
        </cac:Party>
    </cac:AccountingSupplierParty>
    <cac:AccountingCustomerParty>
        <cac:Party>
            <cac:PartyName>
                <cbc:Name>{customer_name}</cbc:Name>
            </cac:PartyName>
            <cac:PostalAddress>
                <cbc:StreetName>{customer_street}</cbc:StreetName>
                <cbc:CityName>{customer_city}</cbc:CityName>
                <cbc:PostalZone>{customer_postal_zone}</cbc:PostalZone>
                <cbc:CountrySubentity>{customer_country_subentity}</cbc:CountrySubentity>
                <cac:Country>
                    <cbc:IdentificationCode>{customer_country_code}</cbc:IdentificationCode>
                </cac:Country>
            </cac:PostalAddress>
            <cac:PartyTaxScheme>
                <cbc:CompanyID>{customer_cui}</cbc:CompanyID>
                <cac:TaxScheme>
                    <cbc:ID>VAT</cbc:ID>
                </cac:TaxScheme>
            </cac:PartyTaxScheme>
            <cac:PartyLegalEntity>
                <cbc:RegistrationName>{customer_registration_name}</cbc:RegistrationName>
            </cac:PartyLegalEntity>
        </cac:Party>
    </cac:AccountingCustomerParty>
    <cac:Delivery>
        <cac:DeliveryLocation>
            <cac:Address>
                <cbc:StreetName>{delivery_street}</cbc:StreetName>
                <cbc:CityName>{delivery_city}</cbc:CityName>
                <cbc:PostalZone>{delivery_postal_zone}</cbc:PostalZone>
                <cbc:CountrySubentity>{delivery_country_subentity}</cbc:CountrySubentity>
                <cac:Country>
                    <cbc:IdentificationCode>{delivery_country_code}</cbc:IdentificationCode>
                </cac:Country>
            </cac:Address>
        </cac:DeliveryLocation>
    </cac:Delivery>
    <cac:PaymentMeans>
        <cbc:PaymentMeansCode>{payment_means_code}</cbc:PaymentMeansCode>
    </cac:PaymentMeans>
    <cac:TaxTotal>
        <cbc:TaxAmount currencyID="{tax_amount_currency}">{tax_amount}</cbc:TaxAmount>
        <cac:TaxSubtotal>
            <cbc:TaxableAmount currencyID="{taxable_amount_currency}">{taxable_amount}</cbc:TaxableAmount>
            <cbc:TaxAmount currencyID="{tax_amount_currency}">{tax_amount}</cbc:TaxAmount>
            <cac:TaxCategory>
                <cbc:ID>{tax_category_id}</cbc:ID>
                <cbc:Percent>{tax_percent}</cbc:Percent>
                <cbc:TaxExemptionReason>{tax_exemption_reason}</cbc:TaxExemptionReason>
                <cac:TaxScheme>
                    <cbc:ID>VAT</cbc:ID>
                </cac:TaxScheme>
            </cac:TaxCategory>
        </cac:TaxSubtotal>
        <cac:TaxSubtotal>
            <cbc:TaxableAmount currencyID="{taxable_amount_currency}">{taxable_amount}</cbc:TaxableAmount>
            <cbc:TaxAmount currencyID="{tax_amount_currency}">{tax_amount}</cbc:TaxAmount>
            <cac:TaxCategory>
                <cbc:ID>{tax_category_id}</cbc:ID>
                <cbc:Percent>{tax_percent}</cbc:Percent>
                <cbc:TaxExemptionReasonCode>{tax_exemption_reason_code}</cbc:TaxExemptionReasonCode>
                <cbc:TaxExemptionReason>{tax_exemption_reason}</cbc:TaxExemptionReason>
                <cac:TaxScheme>
                    <cbc:ID>VAT</cbc:ID>
                </cac:TaxScheme>
            </cac:TaxCategory>
        </cac:TaxSubtotal>
    </cac:TaxTotal>
    <cac:TaxTotal>
        <cbc:TaxAmount currencyID="{tax_amount_currency}">{tax_amount}</cbc:TaxAmount>
    </cac:TaxTotal>
    <cac:LegalMonetaryTotal>
        <cbc:LineExtensionAmount currencyID="{line_extension_amount_currency}">{line_extension_amount}</cbc:LineExtensionAmount>
        <cbc:TaxExclusiveAmount currencyID="{tax_exclusive_amount_currency}">{tax_exclusive_amount}</cbc:TaxExclusiveAmount>
        <cbc:TaxInclusiveAmount currencyID="{tax_inclusive_amount_currency}">{tax_inclusive_amount}</cbc:TaxInclusiveAmount>
        <cbc:AllowanceTotalAmount currencyID="{allowance_total_amount_currency}">{allowance_total_amount}</cbc:AllowanceTotalAmount>
        <cbc:ChargeTotalAmount currencyID="{charge_total_amount_currency}">{charge_total_amount}</cbc:ChargeTotalAmount>
        <cbc:PrepaidAmount currencyID="{prepaid_amount_currency}">{prepaid_amount}</cbc:PrepaidAmount>
        <cbc:PayableRoundingAmount currencyID="{payable_rounding_amount_currency}">{payable_rounding_amount}</cbc:PayableRoundingAmount>
        <cbc:PayableAmount currencyID="{payable_amount_currency}">{payable_amount}</cbc:PayableAmount>
    </cac:LegalMonetaryTotal>
    <cac:InvoiceLine>
        <cbc:ID>1</cbc:ID>
        <cbc:InvoicedQuantity unitCode="{invoiced_quantity_unit_code}">{invoiced_quantity}</cbc:InvoicedQuantity>
        <cbc:LineExtensionAmount currencyID="{line_extension_amount_currency}">{line_extension_amount}</cbc:LineExtensionAmount>
        <cac:Item>
            <cbc:Name>{item_name}</cbc:Name>
            <cac:ClassifiedTaxCategory>
                <cbc:ID>{item_tax_category_id}</cbc:ID>
                <cbc:Percent>{item_tax_percent}</cbc:Percent>
                <cac:TaxScheme>
                    <cbc:ID>VAT</cbc:ID>
                </cac:TaxScheme>
            </cac:ClassifiedTaxCategory>
        </cac:Item>
        <cac:Price>
            <cbc:PriceAmount currencyID="{price_amount_currency}">{price_amount}</cbc:PriceAmount>
        </cac:Price>
    </cac:InvoiceLine>
</Invoice>
<!--XML generat cu aplicatia ANAF stage Beta-->"""

# Generate 10 XML files with fictive data
for i in range(1, 51):
    # Generate random data for each XML file
    data = {
        "invoice_id": str(random.randint(1000000000, 9999999999)),
        "issue_date": fake.date_between(start_date='-1y', end_date='today'),
        "due_date": fake.date_between(start_date='today', end_date='+1y'),
        "invoice_type_code": random.choice([380, 381, 382]),
        "document_currency_code": "RON",
        "tax_currency_code": "EUR",
        "description_code": random.randint(1, 5),
        "supplier_name": fake.company(),
        "supplier_street": fake.street_address(),
        "supplier_city": fake.city(),
        "supplier_postal_zone": fake.zipcode(),
        "supplier_country_subentity": "RO-B",
        "supplier_country_code": "RO",
        "supplier_cui": fake.unique.random_number(digits=10),
        "supplier_registration_name": fake.company(),
        "customer_name": fake.company(),
        "customer_street": fake.street_address(),
        "customer_city": fake.city(),
        "customer_postal_zone": fake.zipcode(),
        "customer_country_subentity": "RO-B",
        "customer_country_code": "RO",
        "customer_cui": fake.unique.random_number(digits=10),
        "customer_registration_name": fake.company(),
        "delivery_street": fake.street_address(),
        "delivery_city": fake.city(),
        "delivery_postal_zone": fake.zipcode(),
        "delivery_country_subentity": "RO-AB",
        "delivery_country_code": "RO",
        "payment_means_code": random.randint(1, 20),
        "tax_amount_currency": "RON",
        "tax_amount": round(random.uniform(1, 1000), 2),
        "taxable_amount_currency": "RON",
        "taxable_amount": round(random.uniform(1, 10000), 2),
        "tax_category_id": random.choice(["E", "K", "N"]),
        "tax_percent": round(random.uniform(0, 5), 2),
        "tax_exemption_reason": fake.bs(),
        "tax_exemption_reason_code": fake.unique.random_number(digits=5),
        "line_extension_amount_currency": "RON",
        "line_extension_amount": round(random.uniform(1, 10000), 2),
        "tax_exclusive_amount_currency": "RON",
        "tax_exclusive_amount": round(random.uniform(1, 10000), 2),
        "tax_inclusive_amount_currency": "RON",
        "tax_inclusive_amount": round(random.uniform(1, 10000), 2),
        "allowance_total_amount_currency": "RON",
        "allowance_total_amount": round(random.uniform(0, 1000), 2),
        "charge_total_amount_currency": "RON",
        "charge_total_amount": round(random.uniform(0, 1000), 2),
        "prepaid_amount_currency": "RON",
        "prepaid_amount": round(random.uniform(0, 10000), 2),
        "payable_rounding_amount_currency": "RON",
        "payable_rounding_amount": round(random.uniform(0, 100), 2),
        "payable_amount_currency": "RON",
        "payable_amount": round(random.uniform(-10000, 10000), 2),
        "invoiced_quantity_unit_code": random.choice(["57", "24", "15"]),
        "invoiced_quantity": round(random.uniform(1, 100), 2),
        "item_name": fake.word(),
        "item_tax_category_id": random.choice(["E", "K", "N"]),
        "item_tax_percent": round(random.uniform(0, 5), 2),
        "price_amount_currency": "RON",
        "price_amount": round(random.uniform(1, 1000), 2)
    }

    # Create XML file and write data
    xml_data = xml_template.format(**data)
    file_name = f"invoice_{i}.xml"
    with open(file_name, "w", encoding="utf-8") as xml_file:
        xml_file.write(xml_data)

    print(f"Generated {file_name}")

print("XML files generated successfully.")
