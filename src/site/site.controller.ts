import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

import { SiteService } from './site.service';
import { Site } from './site.entity';

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

    @Get('/:siteId')
    @ApiOperation({
        summary: 'Get site by id',
        description: 'This endpoint returns site metadata.',
    })
    getSite(@Param('siteId') id: string): Promise<any> {
        return this.siteService.getSite(id);
    }

    @Post()
    @ApiOperation({
        summary: 'Create a new Site',
        description: 'This endpoint returns success/fail.',
    })
    @ApiBody({ type: Site })
    createSite(@Body() site: Site): Promise<any> {
        return this.siteService.createSite(site);
    }
}
