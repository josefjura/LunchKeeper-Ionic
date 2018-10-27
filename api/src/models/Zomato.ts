
export interface Search {
    results_found?: number

    //Number of results found ,
    results_start?: number

    //The starting location within results from which the results were fetched (used for pagination) ,
    results_shown?: number

    //The number of results fetched (used for pagination) ,
    restaurants?: RestaurantL3[]
}

export interface RestaurantL3 {
    id?: number

    //ID of the restaurant ,
    name?: string

    //Name of the restaurant ,
    url?: string

    //URL of the restaurant page ,
    location?: ResLocation

    //Restaurant location details ,
    average_cost_for_two?: number

    //Average price of a meal for two people ,
    price_range?: number

    //Price bracket of the restaurant (1 being pocket friendly and 4 being the costliest) ,
    currency?: string

    //Local currency symbol; to be used with price ,
    thumb?: string

    //URL of the low resolution header image of restaurant ,
    featured_image?: string

    //URL of the high resolution header image of restaurant ,
    photos_url?: string

    //URL of the restaurant's photos page ,
    menu_url?: string

    //URL of the restaurant's menu page ,
    events_url?: string

    //URL of the restaurant's events page ,
    user_rating?: UserRating

    //Restaurant rating details ,
    has_online_delivery?: boolean

    //Whether the restaurant has online delivery enabled or not ,
    is_delivering_now?: boolean

    //Valid only if has_online_delivery = 1; whether the restaurant is accepting online orders right now ,
    has_table_booking?: boolean

    //Whether the restaurant has table reservation enabled or not ,
    deeplink?: string

    //Short URL of the restaurant page; for use in apps or social shares ,
    cuisines?: string

    //List of cuisines served at the restaurant in csv format ,
    all_reviews_count?: number

    //[Partner access] Number of reviews for the restaurant ,
    photo_count?: number

    //[Partner access] Total number of photos for the restaurant, at max 10 photos for partner access ,
    phone_numbers?: string

    //[Partner access] Restaurant's contact numbers in csv format ,
    photos?: Photo[]

    //[Partner access] List of restaurant photos ,
    all_reviews: Review[]

    //[Partner access] List of restaurant reviews
}

interface ResLocation {
    address?: string

    //Complete address of the restaurant ,
    locality?: string

    //Name of the locality ,
    city?: string

    //Name of the city ,
    latitude?: number

    //Coordinates of the restaurant ,
    longitude?: number

    //Coordinates of the restaurant ,
    zipcode?: string

    //Zipcode ,
    country_id?: number

    //ID of the country
}

interface UserRating {
    aggregate_rating?: number

    //Restaurant rating on a scale of 0.0 to 5.0 in increments of 0.1 ,
    rating_text?: string

    //Short description of the rating ,
    rating_color?: string

    //Color hex code used with the rating on Zomato ,
    votes?: number

    //Number of ratings received
}

interface Photo {
    id?: string

    //ID of the photo ,
    url?: string

    //URL of the image file ,
    thumb_url?: string

    //URL for 200 X 200 thumb image file ,
    user?: User

    //User who uploaded the photo ,
    res_id?: number

    //ID of restaurant for which the image was uploaded ,
    caption?: string

    //Caption of the photo ,
    timestamp?: number

    //Unix timestamp when the photo was uploaded ,
    friendly_time?: string

    //User friendly time string; denotes when the photo was uploaded ,
    width?: number

    //Image width in pixel; usually 640 ,
    height?: number

    //Image height in pixel; usually 640 ,
    comments_count?: number

    //Number of comments on photo ,
    likes_count?: number

    //Number of likes on photo
}

interface Review {
    rating?: number

    //Rating on scale of 0 to 5 in increments of 0.5 ,
    review_text?: string

    //Review text ,
    id?: number

    //ID of the review ,
    rating_color?: string

    //Color hex code used with the rating on Zomato ,
    review_time_friendly?: string

    //User friendly time string corresponding to time of review posting ,
    rating_text?: string

    //Short description of the rating ,
    timestamp?: number

    //Unix timestamp for review_time_friendly ,
    likes?: number

    //No of likes received for review ,
    user?: User

    //User details of author of review ,
    comments_count?: number

    //No of comments on review
}

interface User {
    name?: string

    //User's name ,
    zomato_handle?: string

    //User's @handle; uniquely identifies a user on Zomato ,
    foodie_level?: string

    //Text for user's foodie level ,
    foodie_level_num?: number

    //Number to identify user's foodie level; ranges from 0 to 10 ,
    foodie_color?: string

    //Color hex code used with foodie level on Zomato ,
    profile_url?: string

    //URL for user's profile on Zomato ,
    profile_deeplink?: string

    //short URL for user's profile on Zomato; for use in apps or social sharing ,
    profile_image?: string

    //URL for user's profile image
}

export interface DailyMenu {
    daily_menu?: DailyMenuCategory[]

    //List of restaurant's menu details
}

interface DailyMenuCategory {
    daily_menu_id?: number

    //ID of the restaurant ,
    name?: string

    //Name of the restaurant ,
    start_date?: string

    //Daily Menu start timestamp ,
    end_date?: string

    //Daily Menu end timestamp ,
    dishes: DailyMenuItem[]

    //Menu item in the category
}

interface DailyMenuItem {
    dish_id?: number

    //Menu Item ID ,
    name?: string

    //Menu Item Title ,
    price?: string

    //Menu Item Price
}
