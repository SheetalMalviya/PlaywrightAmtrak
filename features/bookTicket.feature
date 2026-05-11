Feature: Amtrak Ticket Booking
Scenario Outline: Search trains

  Given user is on Amtrak home page
  When user selects "<tripType>" trip type
  And user enters "<from1>" and "<from2>" as from stations
  And user enters "<to1>" and "<to2>" as to stations
  And user enters "<departureDate1>" and "<departureDate2>" as departure dates
  And user enters "<returnDate>" as returnDate
  And user selects "<adults>" adults, "<seniors>" seniors and "<children>" children
  And user selects disability option
  And user clicks search
  #Then search results should be displayed

Examples:
| tripType  | from1 | to1 | departureDate1 | from2 | to2 | departureDate2 | returnDate | adults | seniors | children |
| oneway    | NYP   | WAS | 08/05/2026     |       |     |                 |            | 2      | 2       | 1        |
| roundtrip | LAX   | NYP | 08/05/2026     |       |     |                 | 08/08/2026 | 1      | 2       | 3        |
| multicity | NYP   | WAS | 08/05/2026     | WAS   | BOS | 08/07/2026     |            | 1      | 0       | 0        |