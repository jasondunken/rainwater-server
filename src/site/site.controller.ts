import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

import { SiteService } from './site.service';

import {
    AddSiteSondeDTO,
    CreateSiteDTO,
    UpdateSiteMetadataDTO,
} from 'src/models/site.model';
import { Site, SiteMetadata } from './site.entity';

@Controller('sites')
export class SiteController {
    constructor(private siteService: SiteService) {}

    @Get()
    @ApiOperation({
        summary: 'Get all sites',
        description: 'This endpoint returns an array containing all sites.',
    })
    getAllSites(): Promise<Site[]> {
        return this.siteService.getAllSites();
    }

    @Post()
    @ApiOperation({
        summary: 'Create a new Site',
        description: 'This endpoint returns created site.',
    })
    @ApiBody({ type: CreateSiteDTO })
    createSite(@Body() site: CreateSiteDTO): Promise<Site> {
        return this.siteService.createSite(site);
    }

    @Get('/:id')
    @ApiOperation({
        summary: 'Get site by id',
        description: 'This endpoint returns site.',
    })
    getSite(@Param('id') id: string): Promise<Site> {
        return this.siteService.getSite(id);
    }

    @Get('/location/:id')
    @ApiOperation({
        summary: 'Get site id by location id',
        description: 'This endpoint returns site id.',
    })
    getSiteId(@Param('id') id: string): Promise<Site> {
        return this.siteService.getSiteId(id);
    }

    @Get('/metadata/:id')
    @ApiOperation({
        summary: 'Get site metadata by id',
        description: 'This endpoint returns site metadata.',
    })
    getSiteMetadata(@Param('id') id: string): Promise<SiteMetadata> {
        return this.siteService.getSiteMetadata(id);
    }

    @Put('/metadata')
    @ApiOperation({
        summary: 'Update site metadata',
        description: 'This endpoint returns updated site metadata.',
    })
    putSiteMetadata(
        @Body() addInfo: UpdateSiteMetadataDTO,
    ): Promise<SiteMetadata> {
        return this.siteService.updateSiteMetadata(addInfo);
    }

    @Post('/sonde')
    @ApiOperation({
        summary: "Adds a sonde to a site's list of sondes",
        description: 'This endpoint returns success/fail.',
    })
    @ApiBody({ type: AddSiteSondeDTO })
    addSonde(@Body() addInfo: AddSiteSondeDTO): Promise<any> {
        return this.siteService.addSonde(addInfo);
    }
}
