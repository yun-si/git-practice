# AWS Rigion & Availability Zones（AZ）

<div align="center">

<img src="./images/AWS_region_az.png" width="70%">

圖片來源：[W3School AWS Cloud Availability Zones](https://www.w3schools.com/aws/aws_cloudessentials_awsavailabilityzones.php)

</div>

## Availability Zones（AZ）

一個 AZ 有 「一個或多個 資料中心」 為使用者提供雲端資料庫、雲端部署、雲端運算等等的服務

## Region

AWS 使用 **Region** 來代表一個「有著多個 資料中心」 的物理區域，例如臺灣附近有 Tokyo（日本東京）、Osaka（日本大板）、Seoul（韓國首爾）、Hong Kong SAR（香港）

**一個 Region 有至少三個「獨立」並且「物理位置不一樣」的 AZ**

每個 AZ 都有

-   獨立的電力和冷卻設備
-   嚴謹的安全防護
-   在同一個 Region 中透過超低延遲的網路彼此連接

使用者可以讓自己的應用程式**運行在多個 AZ 上**，以提供高可用性（降低部署在 AWS 的服務完全 shutdown 的可能性）

## Local Zone

-   AWS 基礎架構的部署
-   將**運算、儲存、資料庫和其他特定服務**（例如 EC2）的設備 放置在 靠近更多人或 IT 中心的位置，讓該區域的使用者能夠擁有或提供給 end users 更低延遲的服務

臺灣目前有一個 Local Zone

> Taipei, Taiwan  
> Zone Name: ap-northeast-1-tpe-1a  
> Parent Region: Asia Pacific (Tokyo)

# 如何選擇 Region

選擇 Region 可以考慮以下三點

-   法規（合規性）
-   實體距離：距離越近，延遲通常越低
-   定價

### 法規

有些國家會對資料儲存等有特別規定，例如中國，因此如果要讓服務在中國也合規，可能就要選擇中國境內的 region。

### 實體距離

通常物理距離越近，延遲越低。

但這裡主要是考慮 Region 和 end users 的距離，例如有一個臺灣團隊開發的電商平台，目標客群是居住在美國的人，那 臺灣團隊 其實不是主要的 end user，居住在美國的人才是，因此要選擇美國的 Region

但如果對於延遲沒有很高的要求，可以選擇價格比較便宜的

### 定價

雲端服務主要是 pay per use，根據不同需求選擇不同規格的服務，但不同 Region 還是會有些微定價差異。

例如 EC2 中 同樣是 t4g.nano instance，一小時 Osaka 要 $0.0054，而 Hong Kong SAR 要 $0.0058，雖然差異不大，但一旦將使用時間拉長，還是會有成本上的差異

# 資料來源

-   [AWS Regions and Availability Zones](https://aws.amazon.com/about-aws/global-infrastructure/regions_az/?nc1=h_ls)
-   [Amazon EC2 On-Demand Pricing](https://aws.amazon.com/ec2/pricing/on-demand/)
