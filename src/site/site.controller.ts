import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

import { SiteService } from './site.service';

import { CreateSiteDTO } from 'src/models/site.model';

@Controller('sites')
export class SiteController {
    constructor(private siteService: SiteService) {}

    @Get()
    @ApiOperation({
        summary: 'Get all sites',
        description: 'This endpoint returns an array containing all sites.',
    })
    getAllSites(): Promise<any> {
        return this.siteService.getAllSites();
    }

    @Get('/:id')
    @ApiOperation({
        summary: 'Get site by id',
        description: 'This endpoint returns site metadata.',
    })
    getSiteMetadata(@Param('id') id: string): Promise<any> {
        return this.siteService.getSiteMetadata(id);
    }

    @Post()
    @ApiOperation({
        summary: 'Create a new Site',
        description: 'This endpoint returns success/fail.',
    })
    @ApiBody({ type: CreateSiteDTO })
    createSite(@Body() site: CreateSiteDTO): Promise<any> {
        return this.siteService.createSite(site);
    }

    @Get('/location/:id')
    @ApiOperation({
        summary: 'Get site id by location id',
        description: 'This endpoint returns site id.',
    })
    getSiteId(@Param('id') id: string): Promise<any> {
        return this.siteService.getSiteId(id);
    }
}
